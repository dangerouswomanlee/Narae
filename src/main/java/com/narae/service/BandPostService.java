package com.narae.service;

import com.narae.dto.*;
import com.narae.entity.*;
import com.narae.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BandPostService {

    private final BandPostRepository bandPostRepository;
    private final BandPartRepository bandPartRepository;
    private final BandParticipantRepository bandParticipantRepository;

    public List<BandPostResponseDto> getAllPosts() {
        return bandPostRepository.findAllWithParts()
            .stream()
            .map(BandPostResponseDto::from)
            .collect(Collectors.toList());
    }

    public BandPostResponseDto getPost(Long id) {
        BandPost post = bandPostRepository.findByIdWithPartsAndParticipants(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        return BandPostResponseDto.from(post);
    }

    @Transactional
    public BandPostResponseDto create(BandPostRequestDto dto) {
        BandPost post = BandPost.builder()
            .title(dto.getTitle())
            .songName(dto.getSongName())
            .content(dto.getContent())
            .authorName(dto.getAuthorName())
            .build();

        List<BandPart> parts = dto.getParts().stream()
            .map(p -> BandPart.builder()
                .post(post)
                .partName(p.getPartName())
                .maxCount(p.getMaxCount())
                .build())
            .collect(Collectors.toList());

        post.getParts().addAll(parts);
        return BandPostResponseDto.from(bandPostRepository.save(post));
    }

    public boolean verifyPassword(Long id, String rawPassword) {
        bandPostRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        return true;
    }

    @Transactional
    public BandPostResponseDto update(Long id, BandPostUpdateDto dto) {
        BandPost post = bandPostRepository.findByIdWithPartsAndParticipants(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        post.setTitle(dto.getTitle());
        post.setSongName(dto.getSongName());
        post.setContent(dto.getContent());
        return BandPostResponseDto.from(post);
    }

    @Transactional
    public BandPostResponseDto joinPart(Long partId, String participantName) {
        BandPart part = bandPartRepository.findByIdWithParticipants(partId)
            .orElseThrow(() -> new IllegalArgumentException("파트를 찾을 수 없습니다"));

        if (part.getParticipants().size() >= part.getMaxCount()) {
            throw new IllegalStateException("해당 파트 모집이 마감되었습니다");
        }

        BandPost post = part.getPost();
        if (Boolean.TRUE.equals(post.getIsClosed())) {
            throw new IllegalStateException("마감된 모집입니다");
        }

        boolean duplicate = part.getParticipants().stream()
            .anyMatch(p -> p.getParticipantName().equalsIgnoreCase(participantName));
        if (duplicate) {
            throw new IllegalStateException("이미 해당 파트에 같은 이름으로 신청되어 있습니다");
        }

        BandParticipant participant = BandParticipant.builder()
            .part(part)
            .participantName(participantName)
            .build();

        bandParticipantRepository.save(participant);
        part.getParticipants().add(participant); // 응답 DTO용 L1 캐시 갱신

        Long postId = post.getId();
        BandPost refreshedPost = bandPostRepository.findByIdWithPartsAndParticipants(postId)
            .orElseThrow();

        long totalMax = refreshedPost.getParts().stream().mapToLong(BandPart::getMaxCount).sum();
        long totalCurrent = bandParticipantRepository.countByPostId(postId);

        if (totalMax > 0 && totalCurrent >= totalMax) {
            refreshedPost.setIsClosed(true);
            bandPostRepository.save(refreshedPost);
        }

        return BandPostResponseDto.from(refreshedPost);
    }

    @Transactional
    public BandPostResponseDto leaveParticipant(Long postId, Long participantId) {
        BandParticipant participant = bandParticipantRepository.findById(participantId)
            .orElseThrow(() -> new IllegalArgumentException("참여자를 찾을 수 없습니다"));

        BandPost post = participant.getPart().getPost();
        if (!post.getId().equals(postId)) {
            throw new IllegalArgumentException("잘못된 요청입니다");
        }

        bandParticipantRepository.delete(participant);

        if (Boolean.TRUE.equals(post.getIsClosed())) {
            post.setIsClosed(false);
        }

        BandPost refreshed = bandPostRepository.findByIdWithPartsAndParticipants(postId).orElseThrow();
        return BandPostResponseDto.from(refreshed);
    }

    @Transactional
    public void delete(Long id, String rawPassword) {
        BandPost post = bandPostRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        bandPostRepository.delete(post);
    }

    @Transactional
    public BandPostResponseDto toggleClose(Long id) {
        BandPost post = bandPostRepository.findByIdWithPartsAndParticipants(id)
            .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다"));
        post.setIsClosed(!post.getIsClosed());
        return BandPostResponseDto.from(post);
    }
}
