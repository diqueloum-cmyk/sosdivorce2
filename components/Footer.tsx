export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4">sosdivorce.fr</h4>
            <p className="text-blue-100">Service juridique de divorce en ligne</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Mentions légales</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-white">CGU</a></li>
              <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="#" className="hover:text-white">Service-public.fr</a></li>
              <li><a href="#" className="hover:text-white">CNIL</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-600 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; 2024 sosdivorce.fr - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}

