package io.metabuilder.core.shared.annotations;


import java.lang.annotation.*;

/**
 * Define a application page
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Page {

    /**
     * Route path
     * Example:
     * /users
     * /users/:id
     */
    String path();

    /**
     * Unique page name
     * Example:
     * users.list
     */
    String name();

    /**
     * Page title
     */
    String title() default "";

    /**
     * Page description
     */
    String description() default "";

    /**
     * Layout class
     */
    Class<?> layout() default Void.class;

    /**
     * Require login
     */
    boolean auth() default false;

    /**
     * Required permissions
     */
    String[] permissions() default {};

    /**
     * Show in sidebar/menu
     */
    boolean menu() default false;

    /**
     * Menu icon
     */
    String icon() default "";

    /**
     * Navigation order
     */
    int order() default 0;

    /**
     * Enable cache
     */
    boolean cache() default false;

    /**
     * Allow anonymous access
     */
    boolean anonymous() default false;

    /**
     * Feature flag
     */
    String feature() default "";

    /**
     * Tags
     */
    String[] tags() default {};

    /**
     * Hide from router
     */
    boolean hidden() default false;

    /**
     * Enable SSR
     */
    boolean ssr() default false;

    /**
     * Keep alive
     */
    boolean keepAlive() default false;

    /**
     * Parent page
     */
    Class<?> parent() default Void.class;
}
