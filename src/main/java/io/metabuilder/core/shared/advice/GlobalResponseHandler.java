package io.metabuilder.core.shared.advice;

import io.metabuilder.core.shared.model.APIResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import tools.jackson.databind.ObjectMapper;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalResponseHandler implements ResponseBodyAdvice<Object> {

    private final ObjectMapper objectMapper;

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        // Apply to all controllers in our package
        String packageName = returnType.getDeclaringClass().getPackageName();
        return packageName.startsWith("io.metabuilder");
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
            Class<? extends HttpMessageConverter<?>> selectedConverterType,
            ServerHttpRequest request, ServerHttpResponse response) {

        APIResponse<Object> apiResponse;
        if (body instanceof APIResponse) {
            apiResponse = (APIResponse<Object>) body;
        } else {
            apiResponse = APIResponse.success(body);
        }

        // StringHttpMessageConverter only accepts String, so we must manually serialize the object
        if (selectedConverterType.getName().contains("StringHttpMessageConverter")) {
            response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            return objectMapper.writeValueAsString(apiResponse);
        }

        return apiResponse;
    }
}
