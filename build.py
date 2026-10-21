"""Build docs/index.html (a single self-contained page) from src/.

    python build.py            # writes docs/index.html
    python build.py OUT.html   # writes to another path as well
"""
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')


def read(*parts):
    with open(os.path.join(SRC, *parts), encoding='utf-8') as f:
        return f.read()


def build():
    sets = sorted(f for f in os.listdir(os.path.join(SRC, 'sets')) if f.endswith('.js'))
    notes = sorted(f for f in os.listdir(os.path.join(SRC, 'notes')) if f.endswith('.js'))
    if len(sets) != len(notes):
        sys.exit(f'sets ({len(sets)}) and notes ({len(notes)}) count differ')

    # each set file declares `const EXAM`; wrap it so the files don't collide
    data = [f'EXAMS.push((function(){{\n{read("sets", f)}\nreturn EXAM;\n}})());' for f in sets]
    data += [read('notes', f) for f in notes]

    app = read('app.html')
    marker = '/*__DATA__*/'
    if app.count(marker) != 1:
        sys.exit('app.html must contain the data marker exactly once')
    return read('head.html') + app.replace(marker, '\n'.join(data)), len(sets)


def main():
    html, n = build()
    outs = [os.path.join(ROOT, 'docs', 'index.html')] + sys.argv[1:]
    for out in outs:
        os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
        with open(out, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'{out}  ({n} sets, {len(html.encode("utf-8")):,} bytes)')


if __name__ == '__main__':
    main()
