from typing import Tuple

from components.parser.core import Parser
from components.parser.engines.base_engine import BaseParserEngine
from components.parser.engines import Ss

class ParserCron:

    def __init__(self):
        print('init')
        # self.__engines: Tuple[BaseParserEngine| ...] = (Ss, MyHome)

    def run(self):
        # for engine in self.__engines:
        #     engine.smartparse()
        basa = Parser(Ss())
        basa.start()



if __name__ == '__main__':
    parser = ParserCron()
    parser.run()
