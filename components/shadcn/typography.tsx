import React from "react";
import classNames from "classnames";

export const H1 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h1 className={classNames("scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl", className)}>{children}</h1>;
};

export const H2 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h2 className={classNames("scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0", className)}>{children}</h2>;
};

export const H3 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h3 className={classNames("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
};

export const H4 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h4 className={classNames("scroll-m-20 text-xl font-medium tracking-tight", className)}>{children}</h4>;
};

export const H5 = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <h5 className={classNames("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h5>;
};

export const P = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={classNames("leading-7 ", className)}>{children}</p>;
};

export const Large = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={classNames("text-lg font-medium", className)}>{children}</div>;
};

export const Mute = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={classNames("text-sm text-muted-foreground whitespace-pre-wrap ", className)}>{children}</p>;
};

export const List = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <ul className={classNames("my-3 text-gray-500  ml-4 list-disc [&>li]:mt-2", className)}>{children}</ul>;
};
