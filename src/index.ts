const vb = 100;
const radius = 50;

type XY = { x: number, y: number };

interface Props {
  points: number,
}


interface Point {
  deg: number,
  p: XY,
  tan: {
    deg: number,
    strength: number,
    p0: XY,
    p1: XY,
  }
}

interface Path {
  c0: XY;
  c1: XY;
  c2: XY;
}

function createPaths(props: Props): Path[] {
  const {
    points: pointCount,
  } = props;

  // 1 - create a series of points
  const points: Point[] = [];

  for (let i = 0; i < pointCount; i += 1) {
    const deg = i * 360 / pointCount;
    const p: XY = {
      x: round(radius * cosd(deg)),
      y: round(radius * sind(deg)),
    };
    const dir = (i % 2) ? 1 : -1;
    const tanDeg = round(dir * 90 * Math.random());
    const tanStrength = 10;
    const tanDx = round(tanStrength * cosd(tanDeg));
    const tanDy = round(tanStrength * sind(tanDeg));
    const tanP0 = { x: p.x - tanDx, y: p.y - tanDy, };
    const tanP1 = { x: p.x + tanDx, y: p.y + tanDy, };
    points.push({
      deg,
      p,
      tan: {
        deg: tanDeg,
        p0: tanP0,
        p1: tanP1,
        strength: tanStrength,
      },
    });
  }


  const paths: Path[] = [];
  for (let i = 0; i < points.length; i += 1) {
    const prev = at(points, i - 1);
    const next = at(points, i);
    paths.push({
      c0: { x: prev.tan.p1.x, y: prev.tan.p1.y, },
      c1: { x: next.tan.p0.x, y: next.tan.p0.y, },
      c2: { x: next.p.x, y: next.p.y, },
    });
  }

  return paths;
}

function toD(paths: Path[]): string {
  let str = `M ${paths[0]!.c2.x}, ${paths[0]!.c2.y}`;
  for (let i = 1; i < paths.length; i += 1) {
    const { c0, c1, c2, } = paths[i]!;
    str += '\nC'
      + `\n  ${c0.x}, ${c0.y}`
      + `\n  ${c1.x}, ${c1.y}`
      + `\n  ${c2.x}, ${c2.y}`
    ;
  }
  str += '\nZ';
  return str;
}


const result = createPaths({ points: 4, });
console.log(toD(result));

/**
 * Get array element at an index
 * supports negative and overflow indexing
 *
 * @param arr
 * @param index
 * @returns
 */
function at<T>(arr: T[], index: number): T {
  // implements reverse indexing and index wrapping
  const _index = (index >= 0 ? index : (arr.length + index)) % arr.length;
  // console.log(`index [${index}/${arr.length - 1}]: ${index} -> ${_index}`);
  return arr[_index % arr.length]!;
}


function round(value: number, to = 1) {
  const mult = Number('1' + '0'.repeat(to - 1));
  return Math.round(value * mult) / mult;
}
function cosd(deg: number) { return Math.cos(deg * Math.PI / 180); }
// function cos(rad: number) { return Math.cos(rad); }
function sind(deg: number) { return Math.sin(deg * Math.PI / 180); }
// function sin(rad: number) { return Math.sin(rad); }
