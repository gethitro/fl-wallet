#pragma once

#define ESCAPE_VERSION_STRING(x) #x

#define XETH_VERSION_MAJOR  ESCAPE_VERSION_STRING(0)
#define XETH_VERSION_MINTOR ESCAPE_VERSION_STRING(5)
#define XETH_VERSION_PATCH  ESCAPE_VERSION_STRING(1)

#define XETH_VERSION_RELEASAE_NAME ESCAPE_VERSION_STRING(BETA)


#define XETH_VERSION XETH_VERSION_MAJOR "." XETH_VERSION_MINTOR "-" XETH_VERSION_PATCH " (" XETH_VERSION_RELEASAE_NAME ")"
