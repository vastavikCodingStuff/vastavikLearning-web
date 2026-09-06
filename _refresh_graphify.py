import json, os
from graphify.detect import detect
from graphify.extract import collect_files, extract
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json
from pathlib import Path

def main():
    os.makedirs("graphify-out", exist_ok=True)

    print("==> detect")
    det = detect(Path("."))
    Path("graphify-out/.graphify_detect.json").write_text(json.dumps(det, ensure_ascii=False), encoding="utf-8")
    print(f"   files: {det['total_files']}, words: {det.get('total_words', 0)}")

    print("==> AST extract")
    code_files = []
    for f in det.get("files", {}).get("code", []):
        code_files.extend(collect_files(Path(f)) if Path(f).is_dir() else [Path(f)])
    ast = extract(code_files, cache_root=Path("."), parallel=False)
    Path("graphify-out/.graphify_ast.json").write_text(json.dumps(ast, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"   AST: {len(ast['nodes'])} nodes, {len(ast['edges'])} edges")

    sem = {"nodes": [], "edges": [], "hyperedges": [], "input_tokens": 0, "output_tokens": 0}
    seen = {n["id"] for n in ast["nodes"]}
    merged_nodes = list(ast["nodes"]) + [n for n in sem["nodes"] if n["id"] not in seen]
    merged_edges = ast["edges"] + sem["edges"]
    Path("graphify-out/.graphify_extract.json").write_text(json.dumps({"nodes": merged_nodes, "edges": merged_edges, "hyperedges": [], "input_tokens": 0, "output_tokens": 0}, indent=2, ensure_ascii=False), encoding="utf-8")

    print("==> build + cluster + report")
    ext = json.loads(Path("graphify-out/.graphify_extract.json").read_text(encoding="utf-8"))
    G = build_from_json(ext, root=".", directed=False)
    comms = cluster(G)
    cohesion = score_all(G, comms)
    gods = god_nodes(G)
    surprises = surprising_connections(G, comms)
    labels_path = Path("graphify-out/.graphify_labels.json")
    if labels_path.exists():
        labels = {int(k): v for k, v in json.loads(labels_path.read_text(encoding="utf-8")).items()}
    else:
        labels = {c: "Community " + str(c) for c in comms}
    questions = suggest_questions(G, comms, labels)
    report = generate(G, comms, cohesion, labels, gods, surprises, det, {"input": 0, "output": 0}, ".", suggested_questions=questions)
    Path("graphify-out/GRAPH_REPORT.md").write_text(report, encoding="utf-8")
    Path("graphify-out/.graphify_labels.json").write_text(json.dumps({str(k): v for k, v in labels.items()}, ensure_ascii=False), encoding="utf-8")
    to_json(G, comms, "graphify-out/graph.json", community_labels=labels)
    print(f"==> Graph: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges, {len(comms)} communities")

if __name__ == "__main__":
    main()