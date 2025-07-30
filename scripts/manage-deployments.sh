#!/bin/bash

# Script to manage local preview deployments

case "$1" in
  list)
    echo "Active deployments:"
    for pid_file in /tmp/app-issue-*.pid; do
      if [ -f "$pid_file" ]; then
        ISSUE=$(basename "$pid_file" | sed 's/app-issue-\(.*\)\.pid/\1/')
        APP_PID=$(cat "$pid_file")
        PORT=$((3000 + $ISSUE))
        NGROK_PID_FILE="/tmp/ngrok-issue-${ISSUE}.pid"
        
        # Check app status
        if ps -p $APP_PID > /dev/null; then
          APP_STATUS="✅"
        else
          APP_STATUS="❌"
        fi
        
        # Check ngrok status and URL
        NGROK_STATUS="❌"
        NGROK_URL="N/A"
        if [ -f "$NGROK_PID_FILE" ]; then
          NGROK_PID=$(cat "$NGROK_PID_FILE")
          if ps -p $NGROK_PID > /dev/null; then
            NGROK_STATUS="✅"
            # Try to get ngrok URL
            NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | jq -r '.tunnels[0].public_url' 2>/dev/null || echo "N/A")
          fi
        fi
        
        echo "  Issue #$ISSUE - Port $PORT"
        echo "    App: PID $APP_PID $APP_STATUS"
        echo "    Ngrok: $NGROK_STATUS URL: $NGROK_URL"
      fi
    done
    ;;
    
  stop)
    if [ -z "$2" ]; then
      echo "Usage: $0 stop <issue-number>"
      exit 1
    fi
    APP_PID_FILE="/tmp/app-issue-$2.pid"
    NGROK_PID_FILE="/tmp/ngrok-issue-$2.pid"
    
    # Stop app
    if [ -f "$APP_PID_FILE" ]; then
      PID=$(cat "$APP_PID_FILE")
      kill -9 $PID 2>/dev/null && echo "Stopped app for issue #$2"
      rm -f "$APP_PID_FILE" "/tmp/app-issue-$2.log"
    fi
    
    # Stop ngrok
    if [ -f "$NGROK_PID_FILE" ]; then
      PID=$(cat "$NGROK_PID_FILE")
      kill -9 $PID 2>/dev/null && echo "Stopped ngrok for issue #$2"
      rm -f "$NGROK_PID_FILE" "/tmp/ngrok-issue-$2.log"
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