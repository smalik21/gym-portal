import './Stats.css';
import StatCard from '../StatCard/StatCard';

export default function Stats({ stats }) {
    return (
        <div className="Stats">
            {stats.map((stat, idx) => {
                return (
                    <StatCard
                    key={idx}
                    title={stat.title}
                    subTitle={stat.subTitle}
                    value={stat.value}
                    color={stat.color}
                    />
                )
            })}
        </div>
    )
}