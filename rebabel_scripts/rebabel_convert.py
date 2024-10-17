import json
import sys
import rebabel_format

(script_name, import_mode, output_mode, infile, outfile,
 nlpFileType, partOfSpeechFile, languageFile, delimiter, mappings, root, skip) = sys.argv
mappings = json.loads(mappings)

rebabel_format.load_processes(True)
rebabel_format.load_readers(True)
rebabel_format.load_writers(True)
rebabel_format.get_process_parameters("export")

rebabel_format.run_command(
    "import",
    mode=import_mode,
    db="temp.db",
    infiles=[infile],
    delimiter=delimiter
)

rebabel_format.run_command(
    "export",
    mode=output_mode,
    db="temp.db",
    outfile="out.flextext",
    mappings=mappings["mappings"],
    root="phrase",
    skip=["morph"],
)