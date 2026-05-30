package io.metabuilder.core.shared.scanner;


import io.metabuilder.core.shared.annotations.Page;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.core.type.filter.AnnotationTypeFilter;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class PageAnnotationScanner implements ApplicationRunner {

    private static final String BASE_PACKAGE_TO_SCAN = "io.metabuilder";

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Bắt đầu quét annotation @Page trong package: {}", BASE_PACKAGE_TO_SCAN);
        long startTime = System.currentTimeMillis();

        // Khởi tạo Scanner. Truyền 'false' để KHÔNG dùng các filter mặc định (@Component, @Service...)
        ClassPathScanningCandidateComponentProvider scanner =
                new ClassPathScanningCandidateComponentProvider(false);

        // Thêm filter: Chỉ tìm những class có gắn annotation @Page
        scanner.addIncludeFilter(new AnnotationTypeFilter(Page.class));

        // Bắt đầu quét
        Set<BeanDefinition> candidateComponents = scanner.findCandidateComponents(BASE_PACKAGE_TO_SCAN);

        int count = 0;
        for (BeanDefinition beanDef : candidateComponents) {
            String className = beanDef.getBeanClassName();
            try {
                Class<?> clazz = Class.forName(className);

                Page pageAnnotation = AnnotatedElementUtils.findMergedAnnotation(clazz, Page.class);

                if (pageAnnotation != null) {
                    // TODO: Tạo PageDefinition DTO từ dữ liệu này (như đã hướng dẫn ở câu trước)
                     PageDefinition def = PageDefinition.from(clazz, pageAnnotation);

                    // TODO: Lưu vào Registry
//                     pageRegistry.register(def);1

                    log.info("Đã quét thấy Page: {} -> Path: {}", pageAnnotation.name(), pageAnnotation.path());

                    count++;
                }

            } catch (ClassNotFoundException e) {
                log.error("Không thể load class: {}", className, e);
            }
        }

        long endTime = System.currentTimeMillis();
        log.info("Hoàn tất quét @Page. Tổng số: {}. Thời gian: {}ms", count, (endTime - startTime));
    }
}
