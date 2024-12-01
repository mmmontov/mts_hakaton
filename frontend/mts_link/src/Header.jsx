import styles from "./Header.module.scss";

function Head() {
    return (
        <header className={styles.header}>
            <h1>
                <a href="/">
                    <img src="../public/Logo.svg" alt="logo" />
                </a>
            </h1>
        </header>
    );

}

export default Head;