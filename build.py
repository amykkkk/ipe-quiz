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


def js_files(sub, prefix=''):
    return sorted(f for f in os.listdir(os.path.join(SRC, sub)) if f.endswith('.js') and f.startswith(prefix))


def build():
    sets = [('sets', f) for f in js_files('sets')]
    notes = [('notes', f) for f in js_files('notes')]
    # 이론계산 sets come after the mock exams so saved records of the exams keep their indexes
    calc = [('calc', f) for f in js_files('calc', 'calc')]
    calc_notes = [('calc', f) for f in js_files('calc', 'note')]
    if len(sets) != len(notes) or len(calc) != len(calc_notes):
        sys.exit(f'sets ({len(sets)}/{len(calc)}) and notes ({len(notes)}/{len(calc_notes)}) count differ')

    # each set file declares `const EXAM`; wrap it so the files don't collide
    data = [f'EXAMS.push((function(){{\n{read(*p)}\nreturn EXAM;\n}})());' for p in sets + calc]
    data += [read(*p) for p in notes + calc_notes]

    app = read('app.html')
    marker = '/*__DATA__*/'
    if app.count(marker) != 1:
        sys.exit('app.html must contain the data marker exactly once')
    return read('head.html') + app.replace(marker, '\n'.join(data)), len(sets) + len(calc)


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
