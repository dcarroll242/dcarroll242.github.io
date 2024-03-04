class Point():                                # The name of a class is capitalized, using camel-case.
    
    def __init__(self, x, y):                 # This is the "constructor" function. In Python it is called __init__().
        """Constructs a point object."""
        self.x = x                            # This attribute, self.x, can be used anywhere within the class.
        self.y = y                            # This attribute, self.y, can be used anywhere within the class.
    
    def display(self):                        # This behavior prints out a formatted representation of the Point object.
        """Prints out a formatted representation of the Point object."""
        print(f"({self.x},{self.y})")
