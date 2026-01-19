type TextProps = {
  children: string;
};

function Text({ children }: TextProps) {
  return <p className="text-sm text-neutral-800">{children}</p>;
}

export default Text;
