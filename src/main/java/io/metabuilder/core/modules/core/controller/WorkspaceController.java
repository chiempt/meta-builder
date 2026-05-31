package io.metabuilder.core.modules.core.controller;

import io.metabuilder.core.modules.core.model.dto.request.WorkspaceDTO;
import io.metabuilder.core.modules.core.model.dto.request.WorkspaceListDTO;
import io.metabuilder.core.modules.core.service.WorkspaceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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


    @GetMapping
    List<WorkspaceListDTO> fetchList() {
        return workspaceService.fetchList();
    }

    @PutMapping("{id}")
    Long update(@PathVariable Long id, @RequestBody WorkspaceDTO request) {
        return workspaceService.update(request, id);
    }

    @DeleteMapping("{id}")
    Long delete(@PathVariable Long id, @RequestBody WorkspaceDTO request) {
        return workspaceService.delete(id);
    }


}
