import sys
import aiml

class Character(object):
    def __init__(self, name):
        self.name = name
        self.properties = {}

    def get_properties(self):
        return self.properties

    def set_properties(self, props):
        self.properties.update(props)

    def respond(self, question, session=None):
        return NotImplemented

    def __repr__(self):
        return "<Character name {}>".format(self.name)

class AIMLCharacter(Character):
    def __init__(self, name):
        super(AIMLCharacter, self).__init__(name)
        self.character = aiml.Kernel()
        self.aiml_files = []
        self.character.verbose(False)

    def load_aiml_files(self, aiml_files):
        for f in aiml_files:
            self.character.learn(f)
            if f not in self.aiml_files:
                self.aiml_files.append(f)

    def reload(self):
        self.load_aiml_files(self.aiml_files)

    def set_property_file(self, propname):
        try:
            with open(propname) as f:
                for line in f:
                    parts = line.split('=')
                    key = parts[0].strip()
                    value = parts[1].strip()
                    self.character.setBotPredicate(key, value)
                    self.properties[key] = value
        except Exception:
            print >>sys.stderr, "Couldn't open {}".format(propname)

    def set_properties(self, props):
        super(AIMLCharacter, self).set_properties(props)
        for key, value in self.properties.iteritems():
            self.character.setBotPredicate(key, value)

    def respond(self, question, session=None):
        ret = {}
        ret['response'] = self.character.respond(question, session)
        ret['emotion'] = self.character.getPredicate('emotion', session)
        ret['botname'] = self.name
        return ret
