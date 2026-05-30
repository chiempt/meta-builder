package io.metabuilder.core.modules.core.service;


import io.metabuilder.core.modules.core.model.dto.request.WorkspaceDTO;
import io.metabuilder.core.modules.core.model.dto.request.WorkspaceListDTO;

import java.util.List;

public interface WorkspaceService {

    Long create(WorkspaceDTO request);

    Long update(WorkspaceDTO request, Long id);

    Long delete(Long id);


    List<WorkspaceListDTO> fetchList();

}
