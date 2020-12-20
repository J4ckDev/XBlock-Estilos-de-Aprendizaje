"""An adaptive-learning testing xblock"""

import pkg_resources
from xblock.core import XBlock
from xblock.fields import Integer, Boolean, JSONField, Scope
from xblock.fragment import Fragment

# Decorator to indicate the need of user information
@XBlock.needs("user")
class AdaptiveTestXBlock(XBlock):
    """
    An adaptive-learning testing xblock. This Xblock allows instructors to 
    selected one of many avlaiable tests (currently Kolb and Dominancia Cerebral)
    and provide an output of the student's learning style via a survey. Improvements
    to this Xblock include Course Modification (see TODOs).
    """

    # Scopes. Persistent variables
    # See scopes definition for user_state (per user) and user_state_summary (global), among others.
    testNumber = Integer(
        default=0, scope=Scope.user_state_summary,
        help="Test number (0: Not avaliable, 1: Kolb, 2: Dominancia",
    )
    # TestResult contains object: { result: string }
    testResult = JSONField(
        default="", scope=Scope.user_state,
        help="String identifying student learning style, according to test",
    )
    # TestResults[] contains per item:
    # { test: number, result: object, user_id: string, user_full_name: string }
    testResults = JSONField(
        default=[], scope=Scope.user_state_summary,
        help="Array containing student information and results",
    )
    testSolved = Boolean(
        default=False, scope=Scope.user_state,
        help="Flag if the user already solved the test",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the StudentAdaptiveTestXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/student_adaptive_test.html")
        frag = Fragment(html.format(self=self))
        
        frag.add_css(self.resource_string("static/css/adaptive_test.css"))

        frag.add_javascript(self.resource_string("static/js/src/jquery-1.12.4.js"))
        frag.add_javascript(self.resource_string("static/js/src/jquery-ui.js"))
        frag.add_javascript(self.resource_string("static/js/src/student_adaptive_test.js"))
        
        frag.initialize_js('StudentAdaptiveTestXBlock')
        return frag

    #Create studio_analytics view to show test results as a table
    def studio_analytics(self, context=None):
        html = self.resource_string("static/html/studio_analytics.html")
        frag = Fragment(html.format(self=self))
        frag.add_javascript(self.resource_string("static/js/src/studio_analytics.js"))
            
        frag.add_css(self.resource_string("static/css/adaptive_test.css"))        
        frag.initialize_js('StudioAnalyticsXBlock')
        return frag

    #Studio view only used to select the test
    def studio_view(self, context=None):
        """
        The primary view of the StudioAdaptiveTestXBlock, shown to students
        when viewing courses.
        """

        
        html = self.resource_string("static/html/studio_adaptive_test.html")
        frag = Fragment(html.format(self=self))
        frag.add_javascript(self.resource_string("static/js/src/studio_adaptive_test.js"))

        frag.add_css(self.resource_string("static/css/adaptive_test.css"))        
        frag.initialize_js('StudioAdaptiveTestXBlock') # Notice

        return frag

    @XBlock.json_handler
    def select_test(self, data, suffix=''):
        """
        Instructor's selected test handler. JS returned data is saved into global testNumber
        """
        self.testNumber = data

        return True

    @XBlock.json_handler
    def load_test(self, data, suffix=''):
        """
        Handler that returns the test currently used
        """
        # Returns results in case student already has resolved teh selected test, returns only the test number otherwise. 
        flag = False
        for i in range (len(self.testResults)):
            if ( (self.testResults[i]["user_id"]==self.scope_ids.user_id) and (self.testResults[i]["test"]==self.testNumber)):
                flag = True
                result = self.testResults[i]["result"]
        
        if flag:
            return { 'test': self.testNumber, 'test_result': result }
        else:
            return { 'test': self.testNumber }
    
    @XBlock.json_handler
    def submit_test(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        collectedTest = data
        user_test_result = {}
        
        user_test_result["result"] = collectedTest
        user_test_result["test"] = self.testNumber

        user_test_result['user_id'] = self.scope_ids.user_id                            
    
        user_service = self.runtime.service(self, 'user')
        xb_user = user_service.get_current_user()
        user_test_result['user_full_name'] = xb_user.full_name
        
        self.testResults.append(user_test_result)
        
        self.testResult = collectedTest
        self.testSolved = True

        return True

    @XBlock.json_handler
    def load_analytics(self, data, suffix=''):
        """
        Show the data.
        """
        return self.testResults

    # Workbench scenarios. Ignore, unless you know how to use them.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("AdaptiveTestXBlock",
             """<adaptive_test/>
             """),
        ]
