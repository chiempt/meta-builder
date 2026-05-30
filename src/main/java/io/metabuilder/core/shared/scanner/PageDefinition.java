package io.metabuilder.core.shared.scanner;

import io.metabuilder.core.shared.annotations.Page;
import java.util.List;

public record PageDefinition(
        String path,
        String name,
        String title,
        String description,
        String layoutClass,
        boolean auth,
        List<String> permissions,
        boolean menu,
        String icon,
        int order,
        boolean cache,
        boolean anonymous,
        String feature,
        List<String> tags,
        boolean hidden,
        boolean ssr,
        boolean keepAlive,
        String parentClass,
        String entityClassName
) {
    public static PageDefinition from(Class<?> clazz, Page page) {
        return new PageDefinition(
                page.path(),
                page.name(),
                page.title(),
                page.description(),
                page.layout().getName(),
                page.auth(),
                List.of(page.permissions()),
                page.menu(),
                page.icon(),
                page.order(),
                page.cache(),
                page.anonymous(),
                page.feature(),
                List.of(page.tags()),
                page.hidden(),
                page.ssr(),
                page.keepAlive(),
                page.parent().getName(),
                clazz.getName()
        );
    }
}