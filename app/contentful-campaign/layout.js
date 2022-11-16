import '../../styles/globals.css'
import styles from '../../styles/Posts.module.css'

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout