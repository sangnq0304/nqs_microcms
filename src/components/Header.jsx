import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import style from "../assets/scss/header.module.scss";

export default function Header({ categories, postCategorySlug }) {
    const pathname = usePathname();
    const cleanPath = pathname.replace(/\/$/, "");

    const isParentOrSubPageActive = (categoryId) => {
        if (cleanPath === `/${categoryId}`) {
            return true;
        }
        if (cleanPath.startsWith(`/${categoryId}/`)) {
            return true;
        }
        if (postCategorySlug && postCategorySlug === categoryId) {
            return true;
        }
        return false;
    };

    const isSubCategoryActive = (parentCategoryId, subCategoryId) => {
        return cleanPath === `/${parentCategoryId}/${subCategoryId}`;
    };

    const menuCategories = categories?.filter((cat) => cat["is-menu"]);

    return (
        <header className="header mb-6">
            <div className="container">
                <div className={style["header__wrapper"]}>
                    <h1 className="header__logo">
                        <Link href="/" className={style["header__logo-link"]}>
                            <Image
                                src="/logo.png"
                                alt="Your Company Logo"
                                width={118}
                                height={46}
                            />
                        </Link>
                    </h1>

                    <nav className={style["header__nav"]}>
                        <ul className={style["header__nav-list"]}>
                            {menuCategories?.map((cat) => {
                                const isActive = isParentOrSubPageActive(
                                    cat.id
                                );

                                return (
                                    <li
                                        key={cat.id}
                                        className={`${
                                            style["header__nav-item"]
                                        } ${
                                            isActive
                                                ? style[
                                                      "header__nav-item--active"
                                                  ]
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            href={`/${cat.id}`}
                                            title={cat.name}
                                            className={
                                                style["header__nav-link"]
                                            }
                                        >
                                            {cat.name}
                                        </Link>

                                        {cat?.children?.length > 0 && (
                                            <ul
                                                className={
                                                    style[
                                                        "header__nav-sub-list"
                                                    ]
                                                }
                                            >
                                                {cat.children.map((subCate) => {
                                                    const subCategoryPath = `/${cat.id}/${subCate.id}`;
                                                    const isSubActive =
                                                        isSubCategoryActive(
                                                            cat.id,
                                                            subCate.id
                                                        );

                                                    return (
                                                        <li
                                                            key={subCate.id}
                                                            className={`header__nav-sub-list-item ${
                                                                isSubActive
                                                                    ? "header__nav-sub-list-item--active"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <Link
                                                                href={
                                                                    subCategoryPath
                                                                }
                                                                title={
                                                                    subCate.name
                                                                }
                                                                className={
                                                                    style[
                                                                        "header__nav-sub-list-link"
                                                                    ]
                                                                }
                                                            >
                                                                {subCate.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
