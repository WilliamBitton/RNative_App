import type {ViewStyle} from 'react-native';

const spacings = [
  'mh0',
  'mh8',
  'mh16',
  'mh24',
  'mh32',
  'mv0',
  'mv8',
  'mv16',
  'mv24',
  'mv32',
  'mt0',
  'mt8',
  'mt16',
  'mt24',
  'mt32',
  'mr0',
  'mr8',
  'mr16',
  'mr24',
  'mr32',
  'mb0',
  'mb8',
  'mb16',
  'mb24',
  'mb32',
  'ml0',
  'ml8',
  'ml16',
  'ml24',
  'ml32',
  'ph0',
  'ph8',
  'ph16',
  'ph24',
  'ph32',
  'pv0',
  'pv8',
  'pv16',
  'pv24',
  'pv32',
  'pt0',
  'pt8',
  'pt16',
  'pt24',
  'pt32',
  'pr0',
  'pr8',
  'pr16',
  'pr24',
  'pr32',
  'pb0',
  'pb8',
  'pb16',
  'pb24',
  'pb32',
  'pl0',
  'pl8',
  'pl16',
  'pl24',
  'pl32',
] as const;

const directions: Record<string, string> = {
  h: 'Horizontal',
  v: 'Vertical',
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
};

export type Spacings = Partial<Record<(typeof spacings)[number], boolean>>;
type SpacingResults = 'margin' | 'padding';

function isValidSpacing(key: string): key is keyof Spacings {
  return (spacings as unknown as string[]).includes(key);
}

export function withSpacing<T extends ViewStyle, U extends Spacings>(
  props: U,
  styles: T,
) {
  const res = {...styles};

  Object.keys(props).forEach(key => {
    if (isValidSpacing(key) && props[key] != null && props[key] !== false) {
      const direction = directions[key[1] ?? ''];
      const value = parseInt(key.substring(2), 10);

      if (direction) {
        if (key.startsWith('m')) {
          res[`margin${direction}` as unknown as SpacingResults] = value;
        } else if (key.startsWith('p')) {
          res[`padding${direction}` as unknown as SpacingResults] = value;
        }
      }
    }
  });

  return res;
}

export function flattenStyles(styles: object | object[]) {
  if (Array.isArray(styles)) {
    let res: object = {};

    styles.forEach(style => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      res = {
        ...res,
        ...style,
      };
    });

    return res;
  }

  return styles;
}
