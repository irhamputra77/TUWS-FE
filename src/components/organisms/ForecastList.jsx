import ForecastCard from "./ForecastCard";

export default function ForecastList({ view, hourly, current }) {
    return <ForecastCard view={view} hourly={hourly} current={current} />;
}
