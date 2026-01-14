from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelSmokeTest(TestCase):
    def test_team_create(self):
        team = Team.objects.create(name='Test Team', description='desc')
        self.assertEqual(str(team), 'Test Team')

    def test_user_create(self):
        team = Team.objects.create(name='Test Team2', description='desc')
        user = User.objects.create(name='Test User', email='test@example.com', team=team, is_superhero=True)
        self.assertEqual(str(user), 'Test User')

    def test_activity_create(self):
        team = Team.objects.create(name='Test Team3', description='desc')
        user = User.objects.create(name='Test User2', email='test2@example.com', team=team, is_superhero=True)
        activity = Activity.objects.create(user=user, activity_type='Run', duration=10, date='2024-01-01')
        self.assertIn('Run', str(activity))

    def test_workout_create(self):
        workout = Workout.objects.create(name='Test Workout', description='desc')
        self.assertEqual(str(workout), 'Test Workout')

    def test_leaderboard_create(self):
        team = Team.objects.create(name='Test Team4', description='desc')
        leaderboard = Leaderboard.objects.create(team=team, points=42)
        self.assertIn('Test Team4', str(leaderboard))
