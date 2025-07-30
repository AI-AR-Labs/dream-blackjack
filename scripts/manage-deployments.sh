#!/bin/bash

# Script to manage local preview deployments

case "$1" in
  list)
    echo "Active deployments:"
    for pid_file in /tmp/app-issue-*.pid; do
      if [ -f "$pid_file" ]; then
        ISSUE=$(basename "$pid_file" | sed 's/app-issue-\(.*\)\.pid/\1/')
        PID=$(cat "$pid_file")
        PORT=$((3000 + $ISSUE))
        if ps -p $PID > /dev/null; then
          echo "  Issue #$ISSUE - Port $PORT - PID $PID ✅"
        else
          echo "  Issue #$ISSUE - Port $PORT - PID $PID ❌ (not running)"
        fi
      fi
    done
    ;;
    
  stop)
    if [ -z "$2" ]; then
      echo "Usage: $0 stop <issue-number>"
      exit 1
    fi
    PID_FILE="/tmp/app-issue-$2.pid"
    if [ -f "$PID_FILE" ]; then
      PID=$(cat "$PID_FILE")
      kill -9 $PID 2>/dev/null && echo "Stopped deployment for issue #$2"
      rm -f "$PID_FILE" "/tmp/app-issue-$2.log"
    else
      echo "No deployment found for issue #$2"
    fi
    ;;
    
  logs)
    if [ -z "$2" ]; then
      echo "Usage: $0 logs <issue-number>"
      exit 1
    fi
    LOG_FILE="/tmp/app-issue-$2.log"
    if [ -f "$LOG_FILE" ]; then
      tail -f "$LOG_FILE"
    else
      echo "No logs found for issue #$2"
    fi
    ;;
    
  cleanup)
    echo "Cleaning up all deployments..."
    for pid_file in /tmp/app-issue-*.pid; do
      if [ -f "$pid_file" ]; then
        PID=$(cat "$pid_file")
        kill -9 $PID 2>/dev/null || true
        rm -f "$pid_file"
      fi
    done
    rm -f /tmp/app-issue-*.log
    echo "All deployments cleaned up"
    ;;
    
  *)
    echo "Usage: $0 {list|stop <issue>|logs <issue>|cleanup}"
    exit 1
    ;;
esac