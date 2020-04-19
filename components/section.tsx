import * as React from "react"
import styles from "components/section.module.sass"

export interface SectionProps {
    title: string
    id: string
    className?: string
}

const Section: React.FC<SectionProps> = (props) => {
    return (
        <section
            className={`${styles.section} ${props.className}`}>
            <h2 id={props.id}>{props.title}</h2>
            {props.children}
        </section>
    )
}

export default Section