package upwm.fractals;

import java.util.List;

public interface FractalSet {

	int getMaxIterations();
	int check(Complex p);
	void setMaxIterations(int iterations);
	
	boolean hasParams();
	List<String> getAvailableParams();
	void setParamValue(String name, Complex c);

}
