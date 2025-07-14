module.exports = {
  // The tcp port that the Node-RED web server is listening on
  uiPort: process.env.PORT || 1880,

  // By default, the Node-RED UI accepts connections on all IPv4 interfaces.
  uiHost: '0.0.0.0',

  // Retry time in milliseconds for MQTT connections
  mqttReconnectTime: 15000,

  // Retry time in milliseconds for Serial port connections
  serialReconnectTime: 15000,

  // Retry time in milliseconds for TCP socket connections
  tcpReconnectTime: 10000,

  // Maximum number of messages to wait in queue while attempting to connect to a tcp socket
  tcpReconnectQueue: 1000,

  // Secure the Node-RED editor with authentication
  // As recommended in the specification for security
  adminAuth: {
    type: 'credentials',
    users: [
      {
        username: 'admin',
        password:
          '$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.',
        permissions: '*',
      },
    ],
  },

  // Enable credential encryption
  credentialSecret:
    process.env.NODE_RED_CREDENTIAL_SECRET || 'secure-edge-gps-logger-secret',

  // Logging configuration
  logging: {
    console: {
      level: 'info',
      metrics: false,
      audit: false,
    },
  },

  // Export the library in settings so it is available to nodes
  functionExternalModules: false,

  // The following property can be used to enable HTTPS
  // Uncomment and configure if SSL certificates are available
  //https: {
  //    key: fs.readFileSync('privatekey.pem'),
  //    cert: fs.readFileSync('certificate.pem')
  //},

  // The following property can be used to specify a different root path.
  //httpRoot: '/red',

  // The following property can be used to add a custom middleware function
  //httpAdminMiddleware: function(req,res,next) {
  //    next();
  //},

  // The following property can be used to verify websocket connection attempts
  //httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},

  // The following property can be used to verify websocket connection attempts
  //httpNodeMiddleware: function(req,res,next) {
  //    next();
  //},

  // Enable project feature
  editorTheme: {
    projects: {
      enabled: true,
    },
  },

  // Flow file settings
  flowFile: 'flows.json',
  flowFilePretty: true,

  // Context storage
  contextStorage: {
    default: {
      module: 'localfilesystem',
    },
  },
};
