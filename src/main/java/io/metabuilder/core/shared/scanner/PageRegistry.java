package io.metabuilder.core.shared.scanner;

import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class PageRegistry {

    // Key là name của page để đảm bảo unique (ví dụ: "users.list")
    private final Map<String, PageDefinition> pages = new ConcurrentHashMap<>();

    public void register(PageDefinition pageDef) {
        if (pages.containsKey(pageDef.name())) {
            throw new IllegalStateException("Phát hiện trùng lặp Page name: " + pageDef.name());
        }
        pages.put(pageDef.name(), pageDef);
    }

    public PageDefinition getPage(String name) {
        return pages.get(name);
    }

    public Collection<PageDefinition> getAllPages() {
        return pages.values();
    }

    public void clear() {
        pages.clear();
    }
}