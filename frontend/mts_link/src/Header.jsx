import styles from "./Header.module.scss";

function Head() {
    return (
        <header className={styles.header}>
            <p className={styles.title}>Команда,<br/> которая может всё</p>
                    <img src="../public/Logo.svg" alt="logo" />
        </header>
    );

}

export default Head;