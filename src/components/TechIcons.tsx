type IconProps = {
  className?: string;
};

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const DeviconIcon = ({
  path,
  alt,
  icon,
  className,
}: IconProps & {
  path: string;
  alt: string;
  icon: string;
}) => (
  <img
    src={`${DEVICON_BASE}/${path}`}
    alt={alt}
    data-devicon={icon}
    className={`devicon-img inline-block object-contain ${className ?? ""}`}
    loading="lazy"
    decoding="async"
    draggable={false}
  />
);

export const Python = ({ className }: IconProps) => (
  <DeviconIcon path="python/python-original.svg" icon="python" alt="Python logo" className={className} />
);

export const Java = ({ className }: IconProps) => (
  <DeviconIcon path="java/java-original.svg" icon="java" alt="Java logo" className={className} />
);

export const ReactIcon = ({ className }: IconProps) => (
  <DeviconIcon path="react/react-original.svg" icon="react" alt="React logo" className={className} />
);

export const Cpp = ({ className }: IconProps) => (
  <DeviconIcon path="cplusplus/cplusplus-original.svg" icon="cplusplus" alt="C++ logo" className={className} />
);

export const Linux = ({ className }: IconProps) => (
  <DeviconIcon path="linux/linux-original.svg" icon="linux" alt="Linux logo" className={className} />
);

export const Docker = ({ className }: IconProps) => (
  <DeviconIcon path="docker/docker-original.svg" icon="docker" alt="Docker logo" className={className} />
);

export const JavaScript = ({ className }: IconProps) => (
  <DeviconIcon path="javascript/javascript-original.svg" icon="javascript" alt="JavaScript logo" className={className} />
);

export const MySQL = ({ className }: IconProps) => (
  <DeviconIcon path="mysql/mysql-original.svg" icon="mysql" alt="MySQL logo" className={className} />
);

export const Git = ({ className }: IconProps) => (
  <DeviconIcon path="git/git-original.svg" icon="git" alt="Git logo" className={className} />
);

export const AWS = ({ className }: IconProps) => (
  <DeviconIcon path="amazonwebservices/amazonwebservices-original-wordmark.svg" icon="amazonwebservices" alt="Amazon Web Services logo" className={className} />
);

export const HTML = ({ className }: IconProps) => (
  <DeviconIcon path="html5/html5-original.svg" icon="html5" alt="HTML5 logo" className={className} />
);

export const CSS = ({ className }: IconProps) => (
  <DeviconIcon path="css3/css3-original.svg" icon="css3" alt="CSS3 logo" className={className} />
);

export const GitHub = ({ className }: IconProps) => (
  <DeviconIcon path="github/github-original.svg" icon="github" alt="GitHub logo" className={className} />
);

export const C = ({ className }: IconProps) => (
  <DeviconIcon path="c/c-original.svg" icon="c" alt="C logo" className={className} />
);
