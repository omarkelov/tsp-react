export const combineClassNames = (...classNames: (string | false | undefined)[]) =>
    classNames.filter(className => !!className).join(' ') as string;
