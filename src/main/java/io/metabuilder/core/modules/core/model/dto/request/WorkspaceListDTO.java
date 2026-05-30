package io.metabuilder.core.modules.core.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkspaceListDTO {

    private Long id;

    private String title;

    private String description;
}
