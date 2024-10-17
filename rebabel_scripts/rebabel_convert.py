import json
import sys
import rebabel_format

(script_name, inType, outType, inPath, outPath,
 nlpFileType, partOfSpeechFile, languageFile, delimiter, mappings, root, skip) = sys.argv
mappings = json.loads(mappings)

rebabel_format.load_processes(True)
rebabel_format.load_readers(True)
rebabel_format.load_writers(True)
rebabel_format.get_process_parameters("export")

rebabel_format.run_command(
    "import",
    mode=inType,
    db="temp.db",
    infiles=[inPath],
    delimiter=delimiter
)

rebabel_format.run_command(
    "export",
    mode=outType,
    db="temp.db",
    outfile="out.flextext",
    mappings=mappings["mappings"],
    root=root,
    skip=skip,
)