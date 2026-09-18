import { kungfu } from '../../data/schoolData'
import { SectionTitle } from '../../components/SectionTitle/SectionTitle'
import { InfoCard } from '../../components/InfoCard/InfoCard'
import { Icon } from '../../components/Icon'
import styles from './KungFu.module.css'

export function KungFu() {
  return (
    <section id="kungfu" className="section section--alt">
      <div className="container">
        <SectionTitle
          kicker="Shaolin Kung Fu"
          title="Un arte marcial milenario, al alcance de todos"
          subtitle={kungfu.intro}
          align="center"
        />

        <div className={styles.pillars}>
          <InfoCard
            icon={<Icon name="zap" size={26} />}
            title={kungfu.pillars[0].title}
            text={kungfu.pillars[0].text}
          />
          <InfoCard
            icon={<Icon name="target" size={26} />}
            title={kungfu.pillars[1].title}
            text={kungfu.pillars[1].text}
          />
          <InfoCard
            icon={<Icon name="eye" size={26} />}
            title={kungfu.pillars[2].title}
            text={kungfu.pillars[2].text}
          />
        </div>
      </div>
    </section>
  )
}