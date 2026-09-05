#!/usr/bin/env bash
# verify-graphify.sh — re-run the graphify pipeline on this project.
# See .agents/WORKFLOW.md §6 — required after any src/ change.
set -euo pipefail
cd "$(dirname "$0")/.."
echo "==> graphify detect"
python -c "import json, os; from graphify.detect import detect; from pathlib import Path; os.makedirs('graphify-out', exist_ok=True); r=detect(Path('.')); Path('graphify-out/.graphify_detect.json').write_text(json.dumps(r, ensure_ascii=False), encoding='utf-8'); print('files:', r['total_files'])"
echo "==> graphify extract (AST)"
python -c "
import json, os
from graphify.extract import collect_files, extract
from pathlib import Path
detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
code_files = []
for f in detect.get('files', {}).get('code', []):
    code_files.extend(collect_files(Path(f)) if Path(f).is_dir() else [Path(f)])
if code_files:
    result = extract(code_files, cache_root=Path('.'))
    Path('graphify-out/.graphify_ast.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
    print('AST nodes:', len(result['nodes']), 'edges:', len(result['edges']))
"
echo "==> graphify build (clusters, report)"
python -c "
import json
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json
from pathlib import Path
ext = json.loads(Path('graphify-out/.graphify_extract.json').read_text(encoding='utf-8'))
det = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8'))
G = build_from_json(ext, root='.', directed=False)
comms = cluster(G)
cohesion = score_all(G, comms)
labels = {c: 'Community ' + str(c) for c in comms}
Path('graphify-out/.graphify_labels.json').write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding='utf-8')
report = generate(G, comms, cohesion, labels, god_nodes(G), surprising_connections(G, comms), det, {'input':0,'output':0}, '.', suggested_questions=suggest_questions(G, comms, labels))
Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding='utf-8')
to_json(G, comms, 'graphify-out/graph.json')
print('Graph: ', G.number_of_nodes(), 'nodes,', G.number_of_edges(), 'edges,', len(comms), 'communities')
"
echo "✅ verify-graphify: OK"
