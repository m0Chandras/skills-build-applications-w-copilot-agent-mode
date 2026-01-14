from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        # Use Djongo's raw collection access to clear collections
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute('DELETE FROM octofit_tracker_activity')
            cursor.execute('DELETE FROM octofit_tracker_workout')
            cursor.execute('DELETE FROM octofit_tracker_leaderboard')
            cursor.execute('DELETE FROM octofit_tracker_user')
            cursor.execute('DELETE FROM octofit_tracker_team')

        # Create teams
        marvel = Team.objects.create(name='Team Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='Team DC', description='DC superheroes')


        # Create users (save individually to avoid Djongo bulk_create issues)

        users = []
        users.append(User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel, is_superhero=True))
        users.append(User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel, is_superhero=True))
        users.append(User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc, is_superhero=True))
        users.append(User.objects.create(name='Batman', email='batman@dc.com', team=dc, is_superhero=True))


        # Create activities (fetch user from DB each time to ensure valid FK)
        for email in ['spiderman@marvel.com', 'ironman@marvel.com', 'wonderwoman@dc.com', 'batman@dc.com']:
            user = User.objects.get(email=email)
            Activity.objects.create(user=user, activity_type='Running', duration=30, date=timezone.now().date())
            Activity.objects.create(user=user, activity_type='Cycling', duration=45, date=timezone.now().date())

        # Create workouts
        workout1 = Workout.objects.create(name='Super Strength', description='Strength training for heroes')
        workout2 = Workout.objects.create(name='Agility Boost', description='Agility and speed drills')
        workout1.suggested_for.set(User.objects.filter(is_superhero=True))
        workout2.suggested_for.set(User.objects.filter(is_superhero=True))

        # Create leaderboards
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
