#Used pyinstaller with the command, pyinstaller -F term.py

import argparse

parser = argparse.ArgumentParser()

parser.add_argument('-msg', type=str, required=True)

args = parser.parse_args()

print("Hello this is from python " + args.msg)