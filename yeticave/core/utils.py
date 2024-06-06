from datetime import datetime, timezone


def calculate_time_left(finished_at: datetime):
    now = datetime.now(timezone.utc)
    return finished_at - now
