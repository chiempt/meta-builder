package io.metabuilder.core.shared.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class APIResponse<T> {
    @Builder.Default
    private String code = "API000";

    @Builder.Default
    private String message = "SUCCESS";

    private T body;

    /**
     * Create a successful response with data
     */
    public static <T> APIResponse<T> success(T data) {
        return APIResponse.<T>builder()
                .code("API000")
                .message("SUCCESS")
                .body(data)
                .build();
    }

    /**
     * Create a successful response with custom message
     */
    public static <T> APIResponse<T> success(T data, String message) {
        return APIResponse.<T>builder()
                .code("API000")
                .message(message)
                .body(data)
                .build();
    }

    /**
     * Create an error response
     */
    public static <T> APIResponse<T> error(String code, String message) {
        return APIResponse.<T>builder()
                .code(code)
                .message(message)
                .build();
    }
}
