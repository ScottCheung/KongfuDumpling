/** @format */

interface PriceDisplayProps {
  price: number;
  className?: string;
  size?: number;
}

export function PriceDisplay({ price = 0, className = '', size = 2 }: PriceDisplayProps) {
  const [integerPart, decimalPart] = price.toFixed(2).split('.');

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className={`text-[${size}vw] font-bold `}>$</span>
      <div className="w-1"></div>
      <span className={`text-[${size*1.5}vw] font-bold`}>{integerPart}</span>
      <span className={`-ml-[${size/10}vw] text-[${size}vw] font-bold`}>.{decimalPart}</span>
    </span>
  );
}
