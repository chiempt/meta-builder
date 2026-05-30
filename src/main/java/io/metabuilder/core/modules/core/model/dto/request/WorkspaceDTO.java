package io.metabuilder.core.modules.core.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkspaceDTO {

    private String title;

    private String description;
}
