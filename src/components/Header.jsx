import Link from "next/link";

import style from "../assets/scss/header.module.scss";

export default function Header({categories}) {

    return (
        <header className="header mb-6">
            <div className="container">
                <div className={style["header__wrapper"]}>
                    <h1 className="header__logo">
                        <Link href="/" className={style["header__logo-link"]}>
                            Logo
                        </Link>
                    </h1>

                    <nav className={style["header__nav"]}>
                        <ul className={style["header__nav-list"]}>
                            {categories?.map((cat) => (
                                <li
                                    key={cat.id}
                                    className={style["header__nav-item"]}
                                >
                                    <Link
                                        href={`/${cat.id}`}
                                        title={cat.name}
                                        className={style["header__nav-link"]}
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
