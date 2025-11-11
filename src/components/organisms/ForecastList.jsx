import ForecastCard from "./ForecastCard";

export default function ForecastList({ view, hourly, daily, current }) {
    return <ForecastCard view={view} hourly={hourly} daily={daily} current={current} />;
}
