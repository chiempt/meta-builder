package io.metabuilder.core.modules.core.controller;

import io.metabuilder.core.modules.core.model.dto.request.WorkspaceDTO;
import io.metabuilder.core.modules.core.service.WorkspaceService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/workspace")
@AllArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;


    @PostMapping
    Long create(
            @RequestBody WorkspaceDTO workspaceDTO
    ) {
        return workspaceService.create(workspaceDTO);
    }

}
