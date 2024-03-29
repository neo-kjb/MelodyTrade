import classNames from 'classnames';
interface props {
  times?: number;
  className?: string;
}
export default function Skeleton({ times, className }: props) {
  const outerClassNames = classNames(
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5',
    className
  );
  const innerClassNames = classNames(
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  );
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div className={outerClassNames} key={i}>
        <div className={innerClassNames}></div>
      </div>
    ));
  return boxes;
}
