#!/usr/bin/env python
# -*- coding:utf-8 -*-

import os
import tornado.web
import tornado.ioloop
import tornado.httpserver
import tornado.options
import torndb
from tornado.options import define, options
import sys
reload(sys)
sys.setdefaultencoding("utf-8")


define('port', default=9000, help="usage: python server.py --port=xxxx",type=int)
define('mysql_host', default="127.0.0.1:3306", help="blog database host")
define('mysql_database', default="licai", help="blog database name")
define('mysql_user', default="root", help="blog database user")
define('mysql_password', default="", help="blog database password")


class BaseHandler(tornado.web.RequestHandler):
    @property
    def db(self):
        return self.application.db


class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")


class huobixingHandler(BaseHandler):
    def get(self):
        sql = "select * from huobixing"
        huobixing_data = self.db.query(sql)
        data = {"huobixing_data" : huobixing_data}
        self.write(data)

class licaibaoHandler(BaseHandler):
    def get(self):
        sql = "select * from licaibao"
        licaibao_data = self.db.query(sql)
        data = {"licaibao_data" : licaibao_data}
        self.write(data)


class Application(tornado.web.Application):
    def __init__(self):
        settings = {
                'static_path':os.path.join(os.path.dirname(__file__),'static'),
                'template_path':os.path.join(os.path.dirname(__file__),'templates'),
                'cookie_secret':'v4rwWDXGR4eGKGWL6vRjUCO+GCeQD0MSgOZBlNl93CQ=',
                'debug':True
                }
        handlers = [
                (r'/', MainHandler),
                (r'/huobixing',huobixingHandler),
                (r'/licaibao',licaibaoHandler),
                ]
        tornado.web.Application.__init__(self, handlers, **settings)
        self.db = torndb.Connection(
             host=options.mysql_host, database=options.mysql_database,
             user=options.mysql_user, password=options.mysql_password,
        )


def main():
    tornado.options.parse_command_line()
    tornado.httpserver.HTTPServer(Application(), xheaders=True).listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt, e:
        print "Quit Server.py !"
