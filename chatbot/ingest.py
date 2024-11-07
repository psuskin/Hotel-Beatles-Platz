import re
import json

import torch

from langchain.docstore.document import Document
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceInstructEmbeddings
from chromadb.config import Settings

def chunk(files):
    chunks = []
    for file, lang in files:
        with open(file, encoding="utf-8") as f:
            lines = f.readlines()

        sample = {"title": "", "text": ""}
        for line in lines:
            line = line.strip()
            if not line:
                continue

            # Check if line starts with the format <number>.<number>
            if re.match(r"^\d+\.\d+", line):
                if sample["text"]:
                    chunks.append(Document(page_content=f'{sample["title"]}:\n\n{sample["text"]}', metadata={"lang": lang}))
                    sample["text"] = ""

                sample["title"] = line.split(" ", 1)[1]
            elif not re.match(r"^\d+\.", line):
                sample["text"] += f"\n{line}" if sample["text"] else line
    
    print(chunks)
    return chunks


EMBEDDING_MODEL_NAME = "intfloat/multilingual-e5-large"

device_type = "cuda" if torch.cuda.is_available() else "cpu"

embeddings = HuggingFaceInstructEmbeddings(
    model_name=EMBEDDING_MODEL_NAME,
    model_kwargs={"device": device_type},
    embed_instruction="passage:",
    query_instruction="query:",
)

def ingest():
    chunks = chunk([('habp_en.txt', 'en'), ('habp_de.txt', 'de')])

    db = Chroma.from_documents(
        chunks,
        embeddings,
        persist_directory="DB_H",
        client_settings=Settings(anonymized_telemetry=False, is_persistent=True)
    )

def evaluate():
    db = Chroma(
        persist_directory="DB_H",
        embedding_function=embeddings,
        client_settings=Settings(anonymized_telemetry=False, is_persistent=True)
    )

    langs = ["en", "de"]
    queries = {lang: [] for lang in langs}
    for lang in langs:
        with open(f"habp_qa_{lang}.txt", encoding="utf-8") as f:
            lines = f.readlines()

        for line in lines:
            line = line.strip()
            if not line:
                continue

            if re.match(r"^\d+\.\d+", line):
                queries[lang].append(line.split(" ", 1)[1])

    # print(queries)

    results = {lang: {} for lang in langs}
    for lang in langs:
        for query in queries[lang]:
            docs = db.similarity_search_with_score(query, k=3, filter={"lang": lang})
            results[lang][query] = [{"text": doc.page_content, "score": score} for doc, score in docs]

    with open("habp_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=4)

def test():
    db = Chroma(
        persist_directory="DB_H",
        embedding_function=embeddings,
        client_settings=Settings(anonymized_telemetry=False, is_persistent=True)
    )

    docs = db.similarity_search_with_score("Do you have a fitness area?", k=3, filter={"lang": "en"})
    print(docs)

if __name__ == "__main__":
    # ingest()
    evaluate()
    # test()