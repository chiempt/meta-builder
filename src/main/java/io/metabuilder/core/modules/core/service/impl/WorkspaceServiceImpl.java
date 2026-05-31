package io.metabuilder.core.modules.core.service.impl;

import io.metabuilder.core.modules.core.entity.Workspace;
import io.metabuilder.core.modules.core.model.dto.request.WorkspaceDTO;
import io.metabuilder.core.modules.core.model.dto.request.WorkspaceListDTO;
import io.metabuilder.core.modules.core.repository.WorkspaceRepository;
import io.metabuilder.core.modules.core.service.WorkspaceService;
import io.metabuilder.core.modules.users.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkspaceServiceImpl implements WorkspaceService {



    private final WorkspaceRepository workspaceRepository;
    private final JwtUtil jwtUtil;

    @Override
    public Long create(WorkspaceDTO request) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        authentication.getDetails();


        Workspace workspace = Workspace.builder()
                .name(request.getTitle())
                .description(request.getDescription())
                .build();
        return workspaceRepository.save(
                workspace
        ).getId();
    }

    @Override
    public Long update(WorkspaceDTO request, Long id) {
        Workspace workspace = workspaceRepository.getReferenceById(id);
        workspace.setName(request.getTitle());
        workspace.setDescription(request.getDescription());
        return workspaceRepository.save(workspace).getId();
    }

    @Override
    public Long delete(Long id) {
        workspaceRepository.deleteById(id);
        return id;
    }

    @Override
    public List<WorkspaceListDTO> fetchList() {
        List<Workspace> workspaceList = workspaceRepository.findAll();
        return workspaceList.stream()
                .map(el -> WorkspaceListDTO.builder()
                        .id(el.getId())
                        .title(el.getName())
                        .description(el.getDescription())
                        .build())
                .toList();
    }
}
